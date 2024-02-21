from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def 이름():
  return '테스트 진행중'