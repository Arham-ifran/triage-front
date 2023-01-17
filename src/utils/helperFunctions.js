export const formatAddress = (address) => {
    return address ? address.substr(0, 6) + '...' + address.substr(-4) : null;
}

export const copyToClipBoard = (url) => {
    navigator.clipboard.writeText(url);
}