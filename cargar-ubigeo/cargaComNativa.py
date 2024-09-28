import pandas as pd
import requests
import glob
import os

#base_url = "http://104.251.212.105:9000/api"
base_url = "http://127.0.0.1:9000/api"

headers = {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiNDYzOTA1NTAiLCJpYXQiOjE3MjcwMjU5NzgsImV4cCI6MTcyNzA0Mzk3OH0.oJgnWs5P2Kr9TNE0Y4dSAhxQxd1Rw0cw4Xd4Q07yeYE",
    "Content-Type": "application/json"
}

print(f"Cargando datos al {base_url}")

def doPOST(excelName):
	print(f"Cargando archivo {excelName}")

	df = pd.read_excel(excelName, sheet_name='comunidadNativa', engine='xlrd', skiprows=3)
	df = df.fillna('')

	for index, row in df.iterrows():
		department = row['DEPARTAMENTO'].strip()

		if department == 'Instituto Nacional de Estadística e Informática' \
			or department == 'DEPARTAMENTO' or department == '/* La ubicación de la Comunidad Nativa se encuentra en evaluación cartográfica':
		    continue

		province = row['PROVINCIA'].strip()
		district = row['DISTRITO'].strip()
		familiaLinguistica = row['FAM. LINGUISTICA'].strip()
		etnia = row['ETNIA'].strip()
		comunidadNativa = row['COMUNIDAD NATIVA'].strip()
		
		dis_code = district[0:6]
		dis_name = district[6:].strip()

		cN_code = comunidadNativa[0:4]
		cN_name = comunidadNativa[4:].strip()

		payload = {
			"codigo": f"{dis_code}{cN_code}",
			"nombre": cN_name,
			"familiaLinguistica": familiaLinguistica,
			"etnia": etnia
		}

		response = requests.post(f"{base_url}/comunidades-nativas", headers=headers, json=payload)

		if response.status_code == 200 or response.status_code == 201:
		    #print("Registro exitoso:", response.text)
		    pass
		else:
		    print("Error:", response.status_code, response.text)
		    print(f"{department}-{province}-{dis_code}{dis_name}-{dis_code}{cN_code}{cN_name}")

directorio = os.getcwd()
patron = os.path.join(directorio, "rptComunidadNativa_amazonas.xls")
archivos = glob.glob(patron)

for archivo in archivos:
	doPOST(archivo)

