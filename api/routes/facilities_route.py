from fastapi import APIRouter,Query,Depends
from utils.user_managment import verify_access_token_user

from utils.gov_aggregation_layer import get_facility_by_filter
router = APIRouter()



# API to locate facilities based on free search text and filters
@router.get("/facilities/filter",tags=["Facilities"])
def filters_search_facilities(filters: str = Query(...), limit: str = Query(...), offset: str = Query(...),token: str = Depends(verify_access_token_user)):
    results = get_facility_by_filter(filters=filters, limit=limit, offset=offset)
    return {"length": len(results), "results": results}

