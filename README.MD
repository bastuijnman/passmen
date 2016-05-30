# PassMen command line password manager

## Installing
To install passmen run: `npm install -g passmen`

## Help
To output the generic help you can run `passmen help`. Want a help output for a specific command? Just run `passmen <command> --help`, where `<command>` is the command you want to see the help for.

## Usage

### First time
When running passmen for the first time it will prompt you for your name and a new master password, this master password will be used for encrypting/decrypting the passwords so you need to remember that well.

### Getting a password
If you've already initialized passmen you can just run `passmen` to get a list of your stored passwords. Select one and enter your master password to decrypt and copy the password.

You can also run: `passmen list`

### Storing a password
To store a password run: `passmen add` this will prompt you for your master password, after entering you can enter the name of the service and the password you want to store.

#### Storing a random password
There are two methods to store a random password.

**Generating a separate password**
Run `passmen random` to create a random password and have it copied to your clipboard or displayed on screen. After that use `passmen add` to store the password you copied.

**Generating a password through add**
Run `passmen add --random` to generate a new random password and immediately add it to passmen.

**Random password size**
You can use the flag `--size=X` to set the size of the random password, for example: `passmen random --random=15`

### Removing a password
To remove a password run: `passmen remove`, this will prompt you for your master password. If your master password is correct you can select the password you want to remove. After selection the password is removed from your list.

**Examples**
```
# Add a new password
passmen add

# Add a random password
passmen add --random

# Add a random 15 character sized password
passmen add --random --size=15

# Generate a random password
passmen random

# Generate a random 15 character sized password
passmen random --size=15

# Remove a password
passmen remove
```