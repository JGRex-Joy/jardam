from collections.abc import Sequence
from typing import Protocol
from .uploaded_file import UploadedFile
from .verification_result import VerificationResult


class DocumentVerifier(Protocol):
    async def verify(self, title: str, beneficiary: str, documents: Sequence[UploadedFile]) -> VerificationResult: ...
