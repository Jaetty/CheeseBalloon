from pydantic import BaseModel, Field, EmailStr

class UsersCreateItem(BaseModel):
    user_id: str = Field(
        default=None, title='사용자 아이디'
    )
    email: EmailStr = Field(
        default=None, title='이메일 형식의 아이디'
    )
    password: str = Field(
        min_length=8, max_length=20, description='비밀번호는 8~20자의 영문, 숫자, 특수문자 조합으로 작성해주세요.'
    )
    nickname: str = Field(
        min_length=2, max_length=8, description='닉네임은 2~8글자의 영문 또는 한글로 만들어주세요.'
    )

    class Config:
        orm_mode = True


class UsersReadItem(BaseModel):
    email: EmailStr
    user_id: str
    nickname: str

    class Config:
        orm_mode = True