def toBin(num):
    d = ""
    while num > 0:
        d = str(num%2) + d
        num = num//2
    return d

