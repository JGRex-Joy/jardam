from collections.abc import Sequence
from .uploaded_file import UploadedFile
from .verification_result import VerificationResult


class MockVerifier:
    async def verify(self, title: str, beneficiary: str, documents: Sequence[UploadedFile]) -> VerificationResult:
        if any(d.is_image for d in documents):
            return VerificationResult(True, 0.9, "[MOCK] Documents received; set GROQ_API_KEY for real analysis.",
                                      ("Documents received",), (), "mock")
        return VerificationResult.uncertain("[MOCK] No readable images.", (), "mock")
