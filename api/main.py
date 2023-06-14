from fastapi import FastAPI, Query
import aggregation_layer
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    # Add more allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API to locate facilities based on free search text
@app.get("/facilities/search")
def search_facilities(search: str = Query(...),limit: str = Query(...),offset: str = Query(...)):
    results= aggregation_layer.get_facility_by_name(name=search,limit=limit,offset=offset)
    return {"length":len(results),"results":results}

# API to locate facilities based on free search text and radius
@app.get("/facilities/filter")
def filters_search_facilities(filters: str = Query(...),limit: str = Query(...),offset: str = Query(...)):
    results= aggregation_layer.get_facility_by_filter(name=filters,limit=limit,offset=offset)
    return {"length":len(results),"results":results}



