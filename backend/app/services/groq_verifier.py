import json
from collections.abc import Sequence
import httpx
from .uploaded_file import UploadedFile
from .verification_result import VerificationResult

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MAX_IMAGES = 3
PROMPT = (
    "You verify charity documents in Kyrgyzstan. Campaign: {title}. Beneficiary: {beneficiary}. "
    "Check validity, official stamps/signatures, name match and red flags. Reply ONLY with JSON: "
    '{{"is_valid": bool, "confidence_score": 0-1, "summary": str, "checks": [str], "red_flags": [str]}}'
)


class GroqVerifier:
    def __init__(self, api_key: str, model: str, timeout: float = 60):
        self._api_key, self._model, self._timeout = api_key, model, timeout

    async def verify(self, title: str, beneficiary: str, documents: Sequence[UploadedFile]) -> VerificationResult:
        images = [d for d in documents if d.is_image][:MAX_IMAGES]
        if not images:
            return VerificationResult.uncertain("Only non-image files; manual review needed.", ("unreadable",), self._model)
        try:
            payload = await self._request(PROMPT.format(title=title, beneficiary=beneficiary), images)
            return VerificationResult.from_payload(payload, self._model)
        except (httpx.HTTPError, ValueError, KeyError) as exc:
            return VerificationResult.uncertain(f"AI unavailable: {type(exc).__name__}", (), self._model)

    async def _request(self, prompt: str, images: Sequence[UploadedFile]) -> dict:
        content = [{"type": "text", "text": prompt}] + [{"type": "image_url", "image_url": {"url": i.data_url}} for i in images]
        body = {"model": self._model, "messages": [{"role": "user", "content": content}],
                "response_format": {"type": "json_object"}, "temperature": 0.1}
        async with httpx.AsyncClient(timeout=self._timeout) as client:
            response = await client.post(GROQ_URL, headers={"Authorization": f"Bearer {self._api_key}"}, json=body)
            response.raise_for_status()
            return json.loads(response.json()["choices"][0]["message"]["content"])
