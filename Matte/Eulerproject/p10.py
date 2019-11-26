import math
def isPrime(num):
    for i in range(2, math.ceil(math.sqrt(num))+1):
        if(num%i==0):
            return False
    return True
sum=2
for i in range(3, 2000000):
    if(isPrime(i)):
        sum+=i
print(sum)
print(isPrime(1))