import base64
from dataclasses import dataclass


@dataclass(frozen=True)
class UploadedFile:
    name: str
    mime: str
    content: bytes

    @property
    def is_image(self) -> bool:
        return self.mime.startswith("image/")

    @property
    def data_url(self) -> str:
        return f"data:{self.mime};base64,{base64.b64encode(self.content).decode()}"
