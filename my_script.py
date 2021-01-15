import sys, json

import base64


import cv2

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    line = read_in()
    
    base = line.replace("data:image/jpeg;base64,","") #para eliminar esta cadena y permitir el decode
    #este print se envia a consola en el controller
    #print(base)


    image_64_decode = base64.b64decode(base)
    image_result = open('foto.jpeg', 'wb') # create a writable image and write the decoding result
    image_result.write(image_64_decode)

    escala_de_grises("foto.jpeg")



"""ESCALA DE GRISES DE LA IMAGEN A COLOR"""
def escala_de_grises(img):

    imagen = cv2.imread(img)
    #convertir imagen a gris
    img_gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
    # 3 canales
    img_convertida = cv2.cvtColor(img_gris, cv2.COLOR_GRAY2RGB)

    #guarda imagen gris
    filename = 'gris.jpeg'
    cv2.imwrite(filename, img_convertida)

    #base64 encode la imagen gris

    image = open('gris.jpeg', 'rb') #open binary file in read mode
    image_read = image.read()
    image_64_encode = base64.b64encode(image_read)

    print(image_64_encode)

    


# Start process
if __name__ == '__main__':
    main()




