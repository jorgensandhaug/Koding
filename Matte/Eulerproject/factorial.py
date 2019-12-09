def factorial(num):
    product=1
    for i in range(1, num):
        product*=i
    return product
print(factorial(1000000))