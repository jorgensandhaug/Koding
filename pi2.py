sum = 4
state = True
for i in range(3, 100000000000, 2):
    if state:
        sum = sum-4/i
        state = False

    else:
        sum = sum +4/i
        state = True

print(sum)
