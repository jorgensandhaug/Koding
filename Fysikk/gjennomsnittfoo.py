import math

summen = 0
antall = 0
i = 0
while i < 100:
    summen += math.sin(i)
    antall += 1
    i += 0.0001

print(summen/antall)
