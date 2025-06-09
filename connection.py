import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="GaleriaArte",
        user="GaleriaArte_owner",
        password="npg_EK2uSIDJr3OG",
        host="ep-mute-sea-a2d5a91w-pooler.eu-central-1.aws.neon.tech",
        port=5432,
        sslmode="require"
    )
