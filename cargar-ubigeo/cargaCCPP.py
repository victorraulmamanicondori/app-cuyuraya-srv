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

def doPOST(excelName):
	df = pd.read_excel(excelName, sheet_name='Sheet1', engine='xlrd', skiprows=6)
	df = df.fillna('')

	for index, row in df.iterrows():
		department = row['DEPARTAMENTO'].strip()
		province = row['PROVINCIA'].strip()
		district = row['DISTRITO'].strip()
		centroPobaldo = row['CENTRO POBLADO'].strip()
		area = row['AREA'].strip()
		
		dis_code = district[0:6]
		dis_name = district[6:].strip()

		cp_code = centroPobaldo[0:4]
		cp_name = centroPobaldo[4:].strip()

		print(f"{department}-{province}-{dis_code}{dis_name}-{cp_code}{cp_name}-{area}")

		payload = {
			"codigo": f"{dis_code}{cp_code}",
			"nombre": cp_name
		}

		if len(area) > 0:
			payload["area"]=area

		response = requests.post(f"{base_url}/centros-poblados", headers=headers, json=payload)

		if response.status_code == 200 or response.status_code == 201:
		    print("Registro exitoso:", response.text)
		else:
		    print("Error:", response.status_code, response.text)

directorio = os.getcwd()
patron = os.path.join(directorio, "ReporteCCPP_*v2.xls")
archivos = glob.glob(patron)

for archivo in archivos:
	doPOST(archivo)

