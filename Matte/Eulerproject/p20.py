import math

summen = 0
tallet = math.factorial(100)
print(tallet)
num = str(tallet)

for x in range(len(num)):
    summen+=int(num[x])
print(summen)