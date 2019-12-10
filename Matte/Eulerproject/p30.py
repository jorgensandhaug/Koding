import math
summen = 0
def looper(nummer, lengde):
    global summen
    if lengde > 0:
        looper(nummer, lengde-1)
        summen += int(nummer[lengde-1])**5
    return summen
def kjor(nummer, lengde):
    global summen
    summen = 0
    looper(nummer, lengde)
    return summen

        
sum2 = 0
for i in range(2, 1000000):
    if(kjor(list(str(i)), len(list(str(i)))) == i):
        sum2+= i
print(sum2)