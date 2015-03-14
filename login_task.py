#!/usr/bin/python3

#Ask for the database username and password to connect to

usernameindc = '1234567'
passwordindc = 'pieintheskydogs'
fpath = './config/env/development.js'

def main():
  username = input('Please enter the database username: ')
  password = input('Please enter the database password: ')
  fd = open(fpath)
  newLines = []
  for line in fd.readlines():
    newLine = line
    if usernameindc in line and passwordindc in line:
      newLine = line.replace(usernameindc, username)
      newLine = newLine.replace(passwordindc, password)
    newLines.append(newLine)
  fd.close()
  fd = open(fpath,'w')
  for line in newLines:
    fd.write(line)
  fd.close()

if __name__=='__main__':
  main()

