import os
number = 0
for filename in sorted(os.listdir('.')):
    if '.gif' in filename:
        os.rename(filename, 'earth'+str(number)+'.gif')
        number+=1