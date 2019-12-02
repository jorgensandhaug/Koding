def fibo(n):
    if n == 1 or n==2:
        return 1
    if n > 0:
        return fibo(n-1)+fibo(n-2)
i = 1
while True:
    if len(str(fibo(i)))==1000 or len(str(fibo(i)))==100 or len(str(fibo(i)))==10:
        print(i)
    i+=1
