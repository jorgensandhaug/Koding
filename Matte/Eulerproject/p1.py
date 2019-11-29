import math
sum = 0
fib = [1, 2]
while True:
    if(fib[len(fib)-1] < 4*math.pow(10, 6)):
        fib.append(fib[len(fib)-1]+fib[len(fib)-2])
    else:
        break
for i in fib:
    if(i%2==0):
        sum+=i
print(sum)
