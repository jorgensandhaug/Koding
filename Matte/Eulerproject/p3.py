import math
biggest = 0
def isPrime(num):
    for i in range(2, math.ceil(math.sqrt(num))):
        if(num%i==0):
            return False
    return True

print(isPrime(600851475143))


number = 600851400
for x in range(1, math.ceil(number/3 + 1)):
    if(number%x==0 and isPrime(x) and x > biggest):
            biggest = x
print(biggest)
    