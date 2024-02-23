from fastapi import FastAPI
from enum import Enum
from pydantic import BaseModel
# from typing import Optional

app = FastAPI()

# /docs 하면 swagger 나옴
# description="This is our first route." <- 설명서
# deprecated=True <- swagger에서 사용 X

@app.get("/")
async def base_get_route():
  return {"message" : "hello world"}

@app.post("/")
async def post():
  return {"message" : "hello from the post route"}

@app.put("/")
async def put():
  return {"message" : "hello from the put route"}

@app.get("/users")
async def list_users():
  return {"message" : "list users route"}

# 타입 지정을 안하면 자동으로 string 처리함.

# fast api는 위에서부터 순차적으로 매칭을 하기 때문에 함수의 순서가 중요하다.
@app.get("/user/me")
async def get_current_user():
  return {"message" : "this is the current user"}

@app.get("/users/{user_id}")
async def list_users(user_id: str):
  return {"user_id" : user_id}


class FoodEnum(str, Enum):
  fruits = "fruits"
  vegetables = "vegetables"
  dairy = "dairy"

@app.get("/foods/{food_name}")
async def get_food(food_name: FoodEnum):
  if food_name == FoodEnum.vegetables:
    return {"food_name" : food_name, "message" : "you are healthy"}

  if food_name.value == "fruits":
    return {
      "food_name" : food_name,
      "message" : "you are still healthy, but like sweet things"
    }

  return {"food_name" : food_name, "message" : "I like chocolate milk"}

fake_items_db = [
  {"item_name" : "Foo"},
  {"item_name" : "Bar"},
  {"item_name" : "Baz"},
]
@app.get("/items")
async def list_items(skip: int = 0, limit: int = 10):
  return fake_items_db[skip: skip + limit]

@app.get("/items/{item_id}")
async def get_item(item_id: str, sample_query_param: str,  q: str | None = None, short: bool = False):
  item = {"item_id" : item_id, "sample_query_param": sample_query_param}
  if q:
    item.update({"q" : q})
  if not short:
    item.update({"description" : "ak numu jam onda"})

  return item

@app.get("/users/{user_id}/items/{item_id}")
async def get_user_item(user_id: int, item_id: str, q: str | None = None, short: bool = False):
  item = {"item_id": item_id, "owner_id": user_id}
  if q:
    item.update({"q":q})
    if not short:
      item.update({"description": "ak numu jam onda"})

    return item


# none으로 처리하면 body에 파라미터로 안받아도 됨.
class Item(BaseModel):
  name: str
  description: str | None = None
  price: float
  tax: float | None = None
@app.post("/items")
async def create_item(item: Item):
  return item