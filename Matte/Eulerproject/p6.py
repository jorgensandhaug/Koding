import math
sum1 = 0
sum2 = 0

for i in range(1, 101):
    sum1+= math.pow(i, 2)
print(sum1)
for k in range(1, 101):
    sum2+=k
sum2 = math.pow(sum2, 2)
print(sum2-sum1)