from dotenv import load_dotenv
import os
from groq import Groq
from flask import Flask, render_template, jsonify, url_for, request

load_dotenv()
API_KEY = os.getenv("GROQ_API_KEY")
print("API_KEY", API_KEY)

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/ask", methods = ["POST"])
def ask():
    try:
        client = Groq(api_key=API_KEY)
        query = request.get_json().get("query")

        chat_completion = client.chat.completions.create(
        messages=[
                {
                    "role": "system",
                    "content": """
                                You are EcoBot, a chatbot that ONLY gives recycling tips.

                                Rules:
                                1. Answer ONLY questions related to recycling, waste management, and sustainability.
                                2. If the question is NOT related to recycling, reply:
                                "I only provide recycling-related tips "
                                3. Always give practical recycling advice.
                                4. Always include a simple source at the end (like: Source: EPA, WWF, etc.)
                                5. Keep answers short and easy to understand.
                            """
                },
                {
                    "role": "user",
                    "content": query,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.5,
            max_completion_tokens=1024
        )

        data = chat_completion.choices[0].message.content

        return jsonify({"response": data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)