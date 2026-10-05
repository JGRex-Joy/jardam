from .base import ORMModel


class DocumentOut(ORMModel):
    id: int
    name: str
    kind: str
    url: str
