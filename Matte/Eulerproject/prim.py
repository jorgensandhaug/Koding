import math
def isPrime(num):
    if(num == 1):
        return False
    elif(num == 2):
        return True
    for i in range(2, math.ceil(math.sqrt(num))+1):
        if(num%i==0):
            return False
    return True