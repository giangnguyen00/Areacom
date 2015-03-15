#!/usr/bin/python3

#Ask for the database username and password to connect to

defline = "\t\turi: 'mongodb://1234567:pieintheskydogs@ds050087.mongolab.com:50087/areacom',\n"
fpath = './config/env/development.js'

def main():
  print("Stripping login secrets...")
  fd = open(fpath)
  newLines = fd.readlines()
  newLines[4] = defline
  fd.close()
  fd = open(fpath,'w')
  for line in newLines:
    fd.write(line)
  fd.close()

if __name__=='__main__':
  main()

