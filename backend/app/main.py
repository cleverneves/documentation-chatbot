from fastapi import FastAPI

app = FastAPI(title="Documentation Chatbot API")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
