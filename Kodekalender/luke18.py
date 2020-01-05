import json
import math
ob = {
    "M": [],
    "F": [],
    "E1": [],
    "E2": []
}
count = 0
with open("names.txt", "r") as names:
    for line in names:
        if line.strip()=="---":
            count+=1
        elif count == 0:
            ob["M"].append(line.strip())
        elif count == 1:
            ob["F"].append(line.strip())
        elif count == 2:
            ob["E1"].append(line.strip())
        elif count == 3:
            ob["E2"].append(line.strip())

def findName(arr):
    fornavn = arr[0]
    etternavn = arr[1].lower()
    gamfor = fornavn
    gamett = etternavn
    kjonn = arr[2]
    asciiSum = 0
    for i in range(len(fornavn)):
        asciiSum+=ord(fornavn[i])
    fornavn = ob[kjonn][asciiSum%(len(ob[kjonn]))] 
    
    etternavn1 = etternavn[:math.ceil(len(etternavn)/2)]
    etternavn2 = etternavn[math.ceil(len(etternavn)/2):]
    alphaSum = 0

    for i in range(len(etternavn1)):
        alphaSum+= ord(etternavn1[i])-96
    etternavn1 = ob["E1"][alphaSum% len(ob["E1"])]

    asciiProd = 1
    for i in range(len(etternavn2)):
        asciiProd*= ord(etternavn2[i])
    if kjonn == "F":
        asciiProd*=len(gamfor+gamett)
    else:
        asciiProd*= len(gamfor)
    asciiProd = list(str(asciiProd))
    etternavn2 = ob["E2"][int("".join(sorted(asciiProd, reverse=True)))%len(ob["E2"])]
    etternavn = etternavn1+etternavn2
    return fornavn+" "+etternavn


navn = []
with open("employees.csv", "r") as fil:
    for line in fil:
        hey = line.strip().split(",")
        navn.append(findName(hey))


biggest = 0
biggestNavn = ""
for i in navn:
    if navn.count(i) > biggest:
        biggestNavn = i
        biggest = navn.count(i)

print(biggestNavn)




