from flask import Flask, request,jsonify
import redis
from flask_cors import CORS


app = Flask(__name__)

def connect_db():
    conexion = redis.StrictRedis(host='db-geo-redis-flask', port=6379, db=0, decode_responses = True)
    #conexion = redis.StrictRedis(host='127.0.0.1', port=6379, db=0, decode_responses = True)
    if (conexion.ping()):
        print ('Conectado al servidor de redis')
    else:
        print ('error...')

    return conexion

db = connect_db()
CORS(app)

#VACIAR BD
'''
db.flushdb()

def inicializar():
    db.geoadd('Universidades', -58.233299, -32.478860, 'UADER FCyT', -58.229687, -32.481489, 'UCU', -58.261326, -32.480244, 'UNER FCSA')
    db.geoadd('Cervecerias', -58.248252, -32.477168, 'Lagash', -58.235334, -32.479540, '7 Colinas', -58.233911, -32.480420, 'Drakkar')
    db.geoadd('Farmacias', -58.230625, -32.483058, 'Modelo', -58.231382, -32.483780, 'Ramírez', -58.232945, -32.486160, 'Alberdi')
    db.geoadd('CentrosEmergencias', -58.261089, -32.481142, 'Hospital Justo José de Urquiza', -58.230651, -32.483259, 'Clínica Uruguay SRL', -58.236718, -32.479712, 'Cooperativa Médida Ltda')
    db.geoadd('Supermercados', -58.232637, -32.486246, 'Supremo', -58.230314, -32.489247, 'Gran Rex', -58.241808, -32.488496, 'DIA')
                            
inicializar()
'''

@app.route('/grupos')
def index():
    grupos = db.keys('*')
    #print(db.geopos('Farmacias', 'Farmacia Ramirez'))
    return jsonify(grupos)

@app.route('/lugaresRadio', methods=['GET'])
def lugaresRadio():
    grupo = request.args.get('grupo')
    longitud = request.args.get('longitud')
    latitud = request.args.get('latitud')
    listt = db.georadius(grupo,longitud,latitud, 5, unit='km', withdist =True)
    return jsonify(listt)


@app.route('/listaGrupo', methods=['GET'])
def grupoInteresado():
    if request.method == 'GET':
        listaInteres =[]
        grupoInteres = request.args.get('grupo')
        lista = db.zrange(grupoInteres,0,-1)
        for l in lista:
            longitud,latitud = db.geopos(grupoInteres,l)[0]
            listaInteres.append({"nombre": l, "longitud":longitud, "latitud":latitud})
        a = jsonify(listaInteres)
        print(a)
        return(a)


@app.route('/agregarLugarGrupoInteres', methods=['POST'])
def agregarGrupoInteres():
    if request.method == 'POST':
        grupo = request.args['grupo']
        latitud = request.args['latitud']
        longitud = request.args['longitud']
        nombre = request.args['nombre']
        db.geoadd(grupo, longitud, latitud,nombre)
    return 'agregado'


if __name__ == '__main__':
    app.run(host='backend', port ='5000', debug=False)
    #app.run(host='localhost', port ='5000', debug=False)
