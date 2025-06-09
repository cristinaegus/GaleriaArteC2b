from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Cliente, Agentegaleria, Obra, Venta
from datetime import datetime, timedelta
import uuid

# URL de conexión correcta para Neon PostgreSQL
DB_URL = "postgresql+psycopg2://GaleriaArte_owner:npg_EK2uSIDJr3OG@ep-mute-sea-a2d5a91w-pooler.eu-central-1.aws.neon.tech:5432/GaleriaArte?sslmode=require"

class GestorGaleria:
    def __init__(self):
        self.engine = create_engine(DB_URL)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()
    def __del__(self):
        self.session.close()
# ...aquí iría la implementación de los métodos de gestión...
