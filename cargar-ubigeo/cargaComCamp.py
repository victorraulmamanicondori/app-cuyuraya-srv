import pandas as pd
import requests
import glob
import os

#base_url = "http://104.251.212.105:9000/api"
base_url = "http://127.0.0.1:9000/api"

headers = {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiNDYzOTA1NTAiLCJpYXQiOjE3MjcwMTkyMDUsImV4cCI6MTcyNzAzNzIwNX0.riDqEAbOCqS57IaoL2ezWGzK47nNx_bKNpGYpyLC7mI",
    "Content-Type": "application/json"
}

print(f"Cargando datos al {base_url}")

def doPOST(excelName):
	print(f"Cargando archivo {excelName}")

	df = pd.read_excel(excelName, sheet_name='comunidadCampesina', engine='xlrd', skiprows=3)
	df = df.fillna('')

	for index, row in df.iterrows():
		department = row['DEPARTAMENTO'].strip()

		if department == 'Instituto Nacional de Estadística e Informática' \
			or department == 'DEPARTAMENTO':
		    continue

		province = row['PROVINCIA'].strip()
		district = row['DISTRITO'].strip()
		comunidadCampesina = row['COMUNIDAD CAMPESINA'].strip()
		
		dis_code = district[0:6]
		dis_name = district[6:].strip()

		cC_code = comunidadCampesina[0:4]
		cC_name = comunidadCampesina[4:].strip()

		print(f"{department}-{province}-{dis_code}{dis_name}-{cC_code}{cC_name}")

		payload = {
			"codigo": f"{dis_code}{cC_code}",
			"nombre": cC_name
		}

		response = requests.post(f"{base_url}/comunidades-campesinas", headers=headers, json=payload)

		if response.status_code == 200 or response.status_code == 201:
		    pass
		    #print("Registro exitoso:", response.text)
		else:
		    print("Error:", response.status_code, response.text)

directorio = os.getcwd()
patron = os.path.join(directorio, "rptComunidadCampesina_*.xls")
archivos = glob.glob(patron)

for archivo in archivos:
	doPOST(archivo)

