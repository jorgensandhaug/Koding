import math
def isPrime(num):
    for i in range(2, math.ceil(math.sqrt(num))+1):
        if(num%i==0):
            return False
    return True
arr = [2]
k = 3
while True:
    if(isPrime(k)):
        arr.append(k)
    k+=1
    if(len(arr) == 10001):
        break
print(arr[-1])