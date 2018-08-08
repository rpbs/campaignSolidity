pragma solidity ^0.4.17;

contract CampanhaFactory {
    address[] public deployedCampanhas;

    function criarCampanha(uint minimo) public {
        address novo = new Campanha(minimo, msg.sender);
        deployedCampanhas.push(novo);
    }

    function getDeployed() public view returns (address[]) {
        return deployedCampanhas;
    }
}

contract Campanha {
    struct Requisicao {
        string description;
        uint value;
        address vendor;
        bool complete;
        uint aprovadoresCount;
        mapping(address => bool) aprovaram;
    }

    address public manager;
    uint public contribuicaoMinima;
    mapping(address => bool) public aprovadores;
    Requisicao[] public requisicoes;
    uint public  aprovadoresCount;

    function Campanha(uint valorMinimo, address criador) public {
        manager = criador;
        contribuicaoMinima = valorMinimo;
    }

    function contribute() public payable {
        require(msg.value > contribuicaoMinima);
        aprovadores[msg.sender] = true;
        aprovadoresCount++;
    }

    function criarRequisicao(string description, uint value, address vendor) public managerOnly {
        Requisicao memory req = Requisicao({
            description: description,
            value: value,
            vendor: vendor,
            complete: false,
            aprovadoresCount: 0
        });

        requisicoes.push(req);
    }

    function aprovarRequisicao(uint idx) public {
        Requisicao storage req = requisicoes[idx];

        require(aprovadores[msg.sender]);
        require(!req.aprovaram[msg.sender]);

        req.aprovaram[msg.sender] = true;
        req.aprovadoresCount++;
    }

    function finalizarRequesicao(uint idx) public managerOnly {
        Requisicao storage req = requisicoes[idx];

        require(req.aprovadoresCount >= (aprovadoresCount / 2));
        require(!req.complete);

        req.vendor.transfer(req.value);
        req.complete = true;

    }

    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }
}
