module.exports = async function ({getNamedAccounts, deployments}) { // HardhatRuntimeEnvironment
    const {deployer} = await getNamedAccounts()
    const {deploy, log, execute} = deployments

    const deployResult = await deploy('ProxyAdmin', {
      from: deployer,
      log: true,
    });

    if (deployResult.newlyDeployed) {
      log(
        `Contract ProxyAdmin deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed.toString()} gas`
      );
      const MultiSigWallet = await deployments.get('MultiSigWallet');
      await execute('ProxyAdmin', {from: deployer}, 'transferOwnership', MultiSigWallet.address);
      log(
        `Transfered Ownership to MultiSig`
      );
    }
};
module.exports.id = 'deploy_proxyAdmin'; // id required to prevent reexecution
module.exports.tags = ['ProxyAdmin'];
module.exports.dependencies = ['MultiSigWallet'];
