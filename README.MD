# PassMen command line password manager

## Installing
To install passmen run: `npm install -g passmen`

## Usage

### First time
When running passmen for the first time it will prompt you for your name and a new master password, this master password will be used for encrypting/decrypting the passwords so you need to remember that well.

### Getting a password
If you've already initialized passmen you can just run `passmen` to get a list of your stored passwords. Select one and enter your master password to decrypt and copy the password.

You can also run: `passmen list`

### Storing a password
To store a password run: `passmen add` this will prompt you for your master password, after entering you can enter the name of the service and the password you want to store.

### Generating a random password
To generate a random password run: `passmen random`, it will generate a 20 character long password.

#### Size
You can specify a size by running `passmen random --size=5`, where 5 can be any number.