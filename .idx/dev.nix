{pkgs}: {

  # Which nixpkgs channel to use.
  channel = "stable-23.05"; # or "unstable"

  # Use https://search.nixos.org/packages to  find packages
  packages = [
    pkgs.nodejs_18
    pkgs.google-cloud-sdk
  ];

  # search for the extension on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "malloydata.malloy-vscode"
  ];
}