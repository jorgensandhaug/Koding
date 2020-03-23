from tkinter import *
from functools import partial
import random

#initializer selve grafikk-programmet
root = Tk()

#definerer størrelser
scale = 4
width = 20
height = 20
mineProb = 0.1
arena = []
buttons = []

# gjør at begge listene blir todimensjonale
for i in range(height):
    arena.append([])
    buttons.append([])

# fyller den "usynlige" arenaen med noen miner og resten nuller
for i in arena:
    for k in range(width):
        if random.uniform(0, 1) < mineProb:
            i.append("x")
        else:
            i.append(0)

# funksjon som finner antall miner rundt en boks
def calcMines(x, y):
    num = 0
    for i in range(y-1, y+2):
        for j in range(x-1, x+2):
            if i >= 0 and i < height and j >= 0 and j < width and arena[i][j] == "x":
                num+=1
    return num


# sørger for at alle nullene blir gjort om til tall utifra hvor mange miner de har i nærheten
for y in range(height):
    for x in range(width):
        if arena[y][x] != "x":
            arena[y][x] = calcMines(x, y)

# funksjon som markerer åpnede bokser slik at de ikke kan bli forsøkt åpnet igjen
# forhindrer en evig loop i den rekursive open-funksjonen
def markAsOpened(x, y):
    arena[y][x] = str(arena[y][x])



# funksjon som åpner feltene rundt et tall dersom antall markerte miner rundt
# samsvarer med tallet
def openAround(x, y):
    miner = 0
    for i in range(y-1, y+2):
        for j in range(x-1, x+2):
            if (not(i==y and j==x)) and i >= 0 and i < height and j >= 0 and j < width and buttons[i][j]["text"] == "m":
                miner += 1
    tall = int(arena[y][x])
    if miner == tall:
        for i in range(y-1, y+2):
            for j in range(x-1, x+2):
                if i >= 0 and i < height and j >= 0 and j < width and buttons[i][j]["text"] == "" :
                    leftClick(j, i)


# funksjon som grafisk åpner bokser
def openButton(x, y):

        number = arena[y][x]
        if number == 0 or number == "0":
            number = "-"
        buttons[y][x] = Button(root, text = number, width = scale, height = int(scale/2))

        if number != "-":
            buttons[y][x].bind('<Button-1>', lambda event, arg1=x, arg2=y : openAround(arg1, arg2))

        buttons[y][x].grid(row=y, column=x)
        markAsOpened(x, y)


# funksjonen som kjører når man venstreklikker på en boks
# åpner opp den boksen man trykker på, men hvis det er en mine så taper man spillet
def leftClick(x, y):
    if arena[y][x] != "x" and buttons[y][x]['text'] != "m":
        openButton(x, y)

        if arena[y][x] == "0":
            open(x, y)
    elif arena[y][x] == "x":
        root.destroy()
        print("Du Tapte")

# funksjonen som kjører når man høyreklikker på en boks
# markerer boksen man trykker på eller tar bort markeringen
# det er meningen å markere der man tror det er miner, 
# og når en boks er markert med en "m", så går det ikke
# an å åpne den
def rightClick(x, y):
    if buttons[y][x]['text'] == "m":
        buttons[y][x]['text'] = ""

    elif buttons[y][x]['text'] == "":
        buttons[y][x]['text'] = "m"

# sørger for det grafiske i oppstarten av programmet
# tegner inn blanke bokser som man kan trykke på
def drawArena():
    for y in range(height):
        for x in range(width):
            buttons[y].append(Button(root, width = scale, height = int(scale/2), bg="blue", fg="white"))

            buttons[y][x].bind('<Button-1>', lambda event, arg1=x, arg2=y : leftClick(arg1, arg2))
            buttons[y][x].bind('<Button-3>', lambda event, arg1=x, arg2=y : rightClick(arg1, arg2))
            buttons[y][x].grid(row=y, column=x)
            
drawArena()


# en funksjon som kjøres dersom den åpnede boksen ikke har noen miner rundt
# da åpnes automatisk alle bokser rundt, og sjekker om de igjen har noen 
# miner rundt seg
def open(x, y):
    for i in range(y-1, y+2):
        for j in range(x-1, x+2):
            if (not(i==y and j==x)) and i >= 0 and i < height and j >= 0 and j < width and not isinstance(arena[i][j], str) and buttons[i][j]['text'] != "m":

                openButton(j, i)

                if arena[i][j] == "0":
                    open(j, i)

#kjører selve grafikk-programmet ved kjøring av koden
root.mainloop()
