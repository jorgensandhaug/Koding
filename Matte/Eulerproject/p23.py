import math
def abun(num):
    summen = 0
    for i in range(1, num):
        if(num%i==0):
            summen+=i
    if(summen > num):
        return True
    return False
print(abun(12))

tot = 0
def cannotbewritten(num):
    for y in range(1, num):
        if(abun(y)):
            for z in range(1, num):
                if(abun(z) and z+y==num):
                    return False
    return True

for x in range(1, 28123):
    if(cannotbewritten(x)):
        tot+=x
    print(tot)

print(tot)


