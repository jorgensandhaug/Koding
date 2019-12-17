import math
alf = [2, 3, 5, 7, 11]
length = len(alf)
sekvens = [2, 2]
antall = 1
while len(sekvens) < 217532235:
    sekvens.extend([alf[antall % length]]*sekvens[antall])
    antall+=1
print(sekvens.count(7)*7)

    
