from .models import Campaign, CampaignStatus, Document, VerificationLog
from .repositories.campaign_repository import CampaignRepository
from .seed_data import BUDGET, DATA, DOC, U

PAYMENT_DATE = "2026-09-12"


def _budget(rows) -> list[dict]:
    return [{"label_ru": ru, "label_kg": kg, "amount": amount} for ru, kg, amount in rows]


def _first_payment(budget: list[dict], target: int, raised: int, verified: bool) -> list[dict]:
    first = budget[0]
    if not verified or raised < first["amount"]:
        return []
    return [{"date": PAYMENT_DATE, "label_ru": "Оплата: " + first["label_ru"], "label_kg": "Төлөм: " + first["label_kg"],
             "amount": first["amount"], "receipt": f"RCP-{target % 1000:03d}-01"}]


def _to_campaign(d: dict, rows) -> Campaign:
    verified = d["status"] == CampaignStatus.VERIFIED.value
    budget, report = _budget(rows), d["report"]
    return Campaign(
        title_ru=d["title_ru"], title_kg=d["title_kg"], summary_ru=d["summary_ru"], summary_kg=d["summary_kg"],
        story_ru=d["story_ru"], story_kg=d["story_kg"], category=d["category"], cover_url=U(d["cover"]),
        beneficiary=d["beneficiary"], payment=d["payment"], target=d["target"], raised=d["raised"],
        donors=d["donors"], days_left=d["days"], status=d["status"], budget=budget,
        expenses=_first_payment(budget, d["target"], d["raised"], verified),
        documents=[Document(name=n, kind="seal" if verified else "document", url=DOC + n.replace(" ", "+")) for n in d["docs"]],
        logs=[VerificationLog(score=report["score"], summary=report["summary"], checks=report["checks"],
                              red_flags=report["red_flags"], model="llama-4-scout")])


async def seed(repo: CampaignRepository) -> None:
    if await repo.count():
        return
    for data, rows in zip(DATA, BUDGET):
        await repo.add(_to_campaign(data, rows))
