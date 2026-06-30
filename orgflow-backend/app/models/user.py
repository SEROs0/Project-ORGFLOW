import enum
import uuid
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Enum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import UUIDBase

if TYPE_CHECKING:
    from app.models.task import Task
    from app.models.notification import Notification
    from app.models.login_log import LoginLog
    from app.models.document import Document
    from app.models.task_comment import TaskComment


class UserRole(str, enum.Enum):
    admin = "admin"
    manager = "manager"
    staff = "staff"


class User(UUIDBase):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False, default=UserRole.staff)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    created_tasks: Mapped[list["Task"]] = relationship(
        "Task", foreign_keys="Task.created_by", back_populates="creator"
    )
    assigned_tasks: Mapped[list["Task"]] = relationship(
        "Task", foreign_keys="Task.assignee_id", back_populates="assignee"
    )
    notifications: Mapped[list["Notification"]] = relationship(
        "Notification", back_populates="user"
    )
    login_logs: Mapped[list["LoginLog"]] = relationship(
        "LoginLog", back_populates="user"
    )
    uploaded_documents: Mapped[list["Document"]] = relationship(
        "Document", back_populates="uploader"
    )
    comments: Mapped[list["TaskComment"]] = relationship(
        "TaskComment", back_populates="user"
    )
