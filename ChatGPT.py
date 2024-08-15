import openai

# Initialize the OpenAI API client with your API key
openai.api_key = "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"

def chatgpt_response(prompt):
    try:
        # Call the OpenAI API to get a response from GPT-3.5 Turbo
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Using the GPT-3.5 Turbo model
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,  # Adjust the response length as needed
            temperature=0.7,  # Adjust the creativity of the response
        )
        
        # Extract the text part of the response
        message = response.choices[0].message['content'].strip()
        return message
    
    except Exception as e:
        return f"Error: {str(e)}"

def main():
    print("Welcome to the ChatGPT 3.5 Turbo API interface!")
    while True:
        prompt = input("You: ")
        if prompt.lower() == "exit":
            break
        response = chatgpt_response(prompt)
        print(f"ChatGPT: {response}")

if __name__ == "__main__":
    main()
