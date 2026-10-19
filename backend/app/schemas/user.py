from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator, AfterValidator
from datetime import datetime
from typing import Annotated

NormalizedEmail = Annotated[EmailStr, AfterValidator(lambda v: v.strip().lower())] # This will normalize the email by stripping whitespace and converting to lowercase

class UserCreate(BaseModel):
    email: NormalizedEmail
    password: str = Field(min_length=8)

    # we have done this to ensure that the email is normalized (lowercased and stripped of whitespace) before being stored in the database. This helps prevent duplicate entries for the same email address with different cases or leading/trailing spaces.
    # @field_validator("email")
    # @classmethod
    # def normalize_email(cls, value: str) -> str:
    #     return value.strip().lower()

class UserRead(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)  # This allows Pydantic to read data from ORM models directly

class UserLogin(BaseModel):
    email: NormalizedEmail
    password: str

# previously, we had a field validator for the email field in the UserCreate model to normalize the email address. However, we have now introduced a new type alias called NormalizedEmail, which uses an Annotated type with an AfterValidator to achieve the same normalization effect. This means that any time we use NormalizedEmail as a type for an email field, it will automatically be normalized (stripped of whitespace and converted to lowercase) without needing to define a separate field validator for each model. This will help us avoid code duplication and make our code cleaner and more maintainable. Also changin the normalize function at one place will affect all models that use the NormalizedEmail type, making it easier to maintain and update the normalization logic in the future.
    # @field_validator("email")
    # @classmethod
    # def normalize_email(cls, value: str) -> str:
    #     return value.strip().lower()