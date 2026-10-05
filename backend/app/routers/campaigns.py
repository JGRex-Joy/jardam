from fastapi import APIRouter, Depends, File, Form, UploadFile
from ..models import Category
from ..schemas import CampaignOut, DonationIn
from ..services.campaign_service import CampaignService
from ..services.commands import CreateCampaignCommand
from ..services.uploaded_file import UploadedFile
from .dependencies import get_campaign_service

router = APIRouter(prefix="/api/campaigns", tags=["campaigns"])


async def _read(upload: UploadFile) -> UploadedFile:
    return UploadedFile(upload.filename or "file", upload.content_type or "application/octet-stream", await upload.read())


@router.get("", response_model=list[CampaignOut])
async def list_campaigns(q: str = "", service: CampaignService = Depends(get_campaign_service)):
    return await service.search(q)


@router.get("/{campaign_id}", response_model=CampaignOut)
async def get_campaign(campaign_id: int, service: CampaignService = Depends(get_campaign_service)):
    return await service.get(campaign_id)


@router.post("/{campaign_id}/donate", response_model=CampaignOut)
async def donate(campaign_id: int, body: DonationIn, service: CampaignService = Depends(get_campaign_service)):
    return await service.donate(campaign_id, body.amount)


@router.post("", response_model=CampaignOut)
async def create_campaign(
    title: str = Form(...), category: Category = Form(...), description: str = Form(...), target: int = Form(..., gt=0),
    beneficiary: str = Form(...), payment: str = Form(""), cover: UploadFile = File(...),
    documents: list[UploadFile] = File(default=[]), service: CampaignService = Depends(get_campaign_service),
):
    cmd = CreateCampaignCommand(title, category.value, description, target, beneficiary, payment)
    return await service.create(cmd, await _read(cover), [await _read(d) for d in documents])
