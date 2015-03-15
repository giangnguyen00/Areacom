#!/usr/bin/python3

#Ask for the database username and password to connect to

import os

usernameindc = '1234567'
passwordindc = 'pieintheskydogs'
fpath = './config/env/development.js'

def main():
  if os.name=='nt':
    os.system('python logout_task.py')
  else:
    os.system('python3 logout_task.py')
  fd = open(fpath)
  newLines = []
  username, password = None, None
  for line in fd.readlines():
    newLine = line
    if usernameindc in line and passwordindc in line:
      username, password = getCredentials()
      newLine = line.replace(usernameindc, username)
      newLine = newLine.replace(passwordindc, password)
    newLines.append(newLine)
  fd.close()
  fd = open(fpath,'w')
  for line in newLines:
    fd.write(line)
  fd.close()
  if not username or not password:
    print("Using stored credentials... use logout_task.py manually to reauth.")

def getCredentials():
  username = input("Enter the DB connection username: ")
  print("Got: " + username)
  password = input("Enter the DB connection password: ")
  print("Got: " + password)
  return username,password

if __name__=='__main__':
  main()

