import asyncio
import logging
import sys
from os import getenv

from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message

from sqlalchemy.orm import Session
from sqlalchemy import text

from bot.db.database import DatabaseMiddleware

# Bot token can be obtained via https://t.me/BotFather
TOKEN = getenv("BOT_TOKEN")

# All handlers should be attached to the Router (or Dispatcher)

dp = Dispatcher()
dp.message.middleware(DatabaseMiddleware())


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer(f"Hello, {html.bold(message.from_user.full_name)}!")


@dp.message(Command("land"))
async def command_finish_handler(message: Message, db: Session) -> None:
    last_mission_id = db.execute(text("SELECT id FROM missions ORDER BY id DESC LIMIT 1")).fetchone()._asdict()['id']
    db.execute(text(f"UPDATE missions SET status='DELIVERED', state=NULL WHERE id = {last_mission_id}"))
    db.commit()

    await message.answer(f"Лифт миссии {last_mission_id} доставлен!")

@dp.message(Command("boom"))
async def command_boom_handler(message: Message, db: Session) -> None:
    last_mission_id = db.execute(text("SELECT id FROM missions ORDER BY id DESC LIMIT 1")).fetchone()._asdict()['id']
    db.execute(text(f"UPDATE missions SET state='exploded', status='CANCELLED' WHERE id = {last_mission_id}"))
    db.commit()

    await message.answer("Лифт взорвался")

@dp.message(Command("open_doors"))
async def command_open_doors_handler(message: Message, db: Session) -> None:
    last_mission_id = db.execute(text("SELECT id FROM missions ORDER BY id DESC LIMIT 1")).fetchone()._asdict()['id']
    db.execute(text(f"UPDATE missions SET door_state='OPEN', state='door openned' WHERE id = {last_mission_id}"))
    db.commit()

    await message.answer("Двери открыты")

@dp.message(Command("broke_cable"))
async def command_broke_cable_handler(message: Message, db: Session) -> None:
    last_mission_id = db.execute(text("SELECT id FROM missions ORDER BY id DESC LIMIT 1")).fetchone()._asdict()['id']
    db.execute(text(f"UPDATE missions SET state='cable broken' WHERE id = {last_mission_id}"))
    db.commit()
    await message.answer("Трос порван")

@dp.message()
async def echo_handler(message: Message) -> None:
    """
    Handler will forward receive a message back to the sender

    By default, message handler will handle all message types (like a text, photo, sticker etc.)
    """
    try:
        # Send a copy of the received message
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        # But not all the types is supported to be copied so need to handle it
        await message.answer("Nice try!")


async def main() -> None:
    # Initialize Bot instance with default bot properties which will be passed to all API calls
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    # And the run events dispatching
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())