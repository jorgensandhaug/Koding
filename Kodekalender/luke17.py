import math
def isKvad(num):
    tall = list(str(num))
    for i in range(len(tall)):
        temp = tall[0]
        tall.extend([temp])
        tall.pop(0)
        if(math.sqrt(int("".join(tall))) == float(math.floor(math.sqrt(int("".join(tall)))))):
            return True
    return False
i = 1
number = 0
antall = 0
while i <= 1000000:
    if(isKvad(number)):
        antall+=1
    number+=i
    i+=1
print(antall)
