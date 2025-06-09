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

# Comprobar la conexión
if __name__ == "__main__":
    try:
        conn = get_connection()
        print("Conexión exitosa a la base de datos.")
        conn.close()
        print("Conexión cerrada.")
    except Exception as e:
        print(f"Error al conectar: {e}")
