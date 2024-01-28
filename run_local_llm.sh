# simple script to test your local LLM before running it within promptfoot
# Swap out whatever models you want to test with the ones in the custom_models folder
# Run with `bash run_local_llm.sh "<your prompt>"`

prompt="Given this natural language query: 'list only 5 users', generate the SQL using postgres dialect that satisfies the request. Use the TABLE_DEFINITIONS below to satisfy the database query. Follow the INSTRUCTIONS.

INSTRUCTIONS:

- ENSURE THE SQL IS VALID FOR THE DIALECT
- USE THE TABLE DEFINITIONS TO GENERATE THE SQL
- DO NOT CHANGE ANY CONTENT WITHIN STRINGS OF THE Natural Language Query
- Exclusively respond with the SQL query needed to satisfy the request and nothing else

TABLE_DEFINITIONS: 

CREATE TABLE users (
    id INT,
    created TIMESTAMP,
    updated TIMESTAMP,
    authed BOOLEAN,
    PLAN TEXT,
    name TEXT,
    email TEXT
);

SQL Statement:
"

# ./custom_models/mistral-7b-instruct-v0.2.Q5_K_M.llamafile -p "[INST]$prompt[/INST]" --log-disable
# ./custom_models/mistral-7b-instruct-v0.1-Q4_K_M-main.llamafile  -p "[INST]$prompt[/INST]" --log-disable
# ./custom_models/phi-2.Q5_K_M.llamafile -p "$prompt" --log-disable
# ./custom_models/rocket-3b.Q5_K_M.llamafile -p "$prompt" --log-disable
# ./custom_models/TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile -p "$prompt" --log-disable